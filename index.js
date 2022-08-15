#!/usr/bin/env node
const fs = require("fs");

// $ jscode-cli nest g domain <domainName>
const isRightCommand = process.argv[2] === "nest" && (process.argv[3] === "g" || process.argv[3] === "generate") && (process.argv[4] === "domain");
if (!isRightCommand) {
  throw new Error("없는 명령어입니다.");
}
console.log(process.argv);

const domainName = process.argv[5];
const domainNameCapitalizedFirstChar = domainName.charAt(0).toUpperCase() + domainName.slice(1);

fs.mkdirSync(`src`)
fs.mkdirSync(`src/${domainName}`)
fs.mkdirSync(`src/${domainName}/application`)
fs.mkdirSync(`src/${domainName}/application/requestDto`)
fs.mkdirSync(`src/${domainName}/application/responseDto`)
fs.mkdirSync(`src/${domainName}/domain`)
fs.mkdirSync(`src/${domainName}/presentation`)
fs.mkdirSync(`src/${domainName}/test`)

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
fs.writeFileSync(`src/${domainName}/${domainName}.module.ts`, moduleTemplate);

const serviceTemplate = `import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { ${domainNameCapitalizedFirstChar}Repository } from "../domain/${domainName}.repository";

@Injectable()
export class ${domainNameCapitalizedFirstChar}Service {
  constructor(
    private dataSource: DataSource,
    private ${domainName}Repository: ${domainNameCapitalizedFirstChar}Repository
  ) {}
}
`
fs.writeFileSync(`src/${domainName}/application/${domainName}.service.ts`, serviceTemplate);
const entityTemplate = `import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "${domainName}s" })
export class ${domainNameCapitalizedFirstChar} {
  @PrimaryGeneratedColumn()
  id: number;
}
`
fs.writeFileSync(`src/${domainName}/domain/${domainName}.entity.ts`, entityTemplate);

const repositoryTemplate = `import { ${domainNameCapitalizedFirstChar}Repository } from "../../common/decorators/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { ${domainNameCapitalizedFirstChar} } from "./${domainName}.entity";

@CustomRepository(${domainNameCapitalizedFirstChar})
export class ${domainNameCapitalizedFirstChar}Repository extends Repository<${domainNameCapitalizedFirstChar}> {
}
`
fs.writeFileSync(`src/${domainName}/domain/${domainName}.repository.ts`, repositoryTemplate);

const controllerTemplate = `import { Controller } from "@nestjs/common";
import { ${domainNameCapitalizedFirstChar}Service } from "../application/${domainName}.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('${domainName}s - 팔로워 관련')
@Controller('${domainName}s')
export class ${domainNameCapitalizedFirstChar}Controller {
  constructor(
    private ${domainName}Service: ${domainNameCapitalizedFirstChar}Service
  ) {}

}
`
fs.writeFileSync(`src/${domainName}/presentation/${domainName}.controller.ts`, controllerTemplate);


