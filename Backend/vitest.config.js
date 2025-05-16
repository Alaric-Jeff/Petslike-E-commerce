import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['**/__tests__/**/*.test.js'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
        },
        reporters: ['dot'],
        colors: true,
        outputTruncateLength: 80,
        outputDiffLines: 50,
    },
}); 