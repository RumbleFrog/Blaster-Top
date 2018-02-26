A simple utility for finding top result in [Blaster](https://github.com/alliedmodders/blaster)'s JSON output fields

# Installation

Yarn: `yarn global add blaster-top`

NPM: `npm install -g blaster-top`

# Usage

`blastertop [-k/XOR/-r] k/r_value -f input.txt -o output.txt`

- -k, --key is a root object property of server
- -r, --rule is a property of the nested rules object

For more info, view `blastertop --help`

# Examples

`blastertop -k map -f input.txt -o output.txt`

`blastertop -r meta_version -f input.txt -o output.txt`
