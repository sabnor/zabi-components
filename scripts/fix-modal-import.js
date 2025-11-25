#!/usr/bin/env node

/**
 * Post-build script to fix Modal import path
 * Changes ../../routes/lib/focus-utils.js to ../routes/lib/focus-utils.js
 * This is needed because svelte-package doesn't transform import paths
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const modalPath = join(process.cwd(), 'dist', 'molecules', 'Modal.svelte');

try {
    let content = readFileSync(modalPath, 'utf-8');
    
    // Replace the import path
    const oldImport = '../../routes/lib/focus-utils.js';
    const newImport = '../routes/lib/focus-utils.js';
    
    if (content.includes(oldImport)) {
        content = content.replace(oldImport, newImport);
        writeFileSync(modalPath, content, 'utf-8');
        console.log('✓ Fixed Modal import path');
    } else if (content.includes(newImport)) {
        console.log('✓ Modal import path already correct');
    } else {
        console.warn('⚠ Could not find focus-utils import in Modal.svelte');
    }
} catch (error) {
    console.error('Error fixing Modal import:', error.message);
    process.exit(1);
}

