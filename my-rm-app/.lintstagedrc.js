module.exports = {
  '**/*.{ts,tsx}': [
    'eslint --fix --max-warnings 0',
    'prettier --write',
    'tsc-files --noEmit',
  ],
  '**/*.{js,jsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{json,md,css,scss}': ['prettier --write'],
};
