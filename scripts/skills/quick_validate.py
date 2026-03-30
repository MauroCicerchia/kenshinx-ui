#!/usr/bin/env python3
"""
Minimal validation script for distributable skills.
"""

from pathlib import Path
import re
import sys

import yaml


ALLOWED_PROPERTIES = {
    "name",
    "description",
    "license",
    "allowed-tools",
    "metadata",
    "compatibility",
}


def validate_skill(skill_path):
    """Basic validation of a skill directory."""
    skill_path = Path(skill_path)
    skill_md = skill_path / "SKILL.md"

    if not skill_md.exists():
        return False, "SKILL.md not found"

    content = skill_md.read_text()
    if not content.startswith("---"):
        return False, "No YAML frontmatter found"

    match = re.match(r"^---\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return False, "Invalid frontmatter format"

    try:
        frontmatter = yaml.safe_load(match.group(1))
    except yaml.YAMLError as exc:
        return False, f"Invalid YAML in frontmatter: {exc}"

    if not isinstance(frontmatter, dict):
        return False, "Frontmatter must be a YAML dictionary"

    unexpected_keys = set(frontmatter.keys()) - ALLOWED_PROPERTIES
    if unexpected_keys:
        return (
            False,
            "Unexpected key(s) in SKILL.md frontmatter: "
            f"{', '.join(sorted(unexpected_keys))}",
        )

    for field in ("name", "description"):
        if field not in frontmatter:
            return False, f"Missing '{field}' in frontmatter"
        if not isinstance(frontmatter[field], str):
            return False, f"{field.capitalize()} must be a string"

    name = frontmatter["name"].strip()
    if not re.match(r"^[a-z0-9-]+$", name):
        return False, "Name must be kebab-case"

    if name.startswith("-") or name.endswith("-") or "--" in name:
        return False, "Name cannot start/end with hyphen or contain consecutive hyphens"

    if len(name) > 64:
        return False, "Name is too long"

    description = frontmatter["description"].strip()
    if "<" in description or ">" in description:
        return False, "Description cannot contain angle brackets"

    if len(description) > 1024:
        return False, "Description is too long"

    return True, "Skill is valid!"


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python quick_validate.py <skill_directory>")
        sys.exit(1)

    valid, message = validate_skill(sys.argv[1])
    print(message)
    sys.exit(0 if valid else 1)
