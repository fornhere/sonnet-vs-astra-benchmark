import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',timeout:180000,workers:1,reporter:'list',use:{browserName:'chromium',headless:true,viewport:{width:1440,height:1000},launchOptions:{executablePath:'/usr/bin/chromium',args:['--no-sandbox','--enable-webgl','--ignore-gpu-blocklist']}}});
