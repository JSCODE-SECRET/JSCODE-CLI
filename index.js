#!/usr/bin/env node
const fs = require("fs");
console.log(process.argv);

const domainName = process.argv[4];
const domainNameCapitalizedFirstChar = domainName.charAt(0).toUpperCase() + domainName.slice(1);

const moduleTemplate = `import { Module } from "@nestjs/common";
import { ${domainNameCapitalizedFirstChar}Service } from "./application/${domainName}.service";
import { ${domainNameCapitalizedFirstChar}Controller } from "./presentation/${domainName}.controller";

@Module({
  imports: [],
  controllers: [${domainNameCapitalizedFirstChar}Controller],
  providers: [${domainNameCapitalizedFirstChar}Service],
})
export class ${domainNameCapitalizedFirstChar}Module {}
`

fs.mkdir(`src/${domainName}`, (err) => {
  console.error(err)
})
fs.mkdir(`src/${domainName}/application`, (err) => {
  console.error(err)
})
fs.mkdir(`src/${domainName}/domain`, (err) => {
  console.error(err)
})
fs.mkdir(`src/${domainName}/presentation`, (err) => {
  console.error(err)
})
fs.mkdir(`src/${domainName}/test`, (err) => {
  console.error(err)
})
fs.writeFileSync(`src/${domainName}/${domainName}.module.ts`, moduleTemplate);


if ((process.argv[2] === "g" || process.argv[2] === "generate") && (process.argv[3] === "domain")) {

}

