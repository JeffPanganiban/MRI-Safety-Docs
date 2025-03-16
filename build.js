#!/usr/bin/env node

const { execSync } = require("child_process");

try {
  console.log("Building project with Vite...");
  execSync("vite build", { stdio: "inherit" });
  console.log("Build completed successfully!");
} catch (error) {
  console.error("Build failed:", error.message);
  process.exit(1);
}
