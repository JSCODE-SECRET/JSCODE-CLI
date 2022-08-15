#!/usr/bin/env node
const fs = require("fs");

// $ jscode-cli nest g domain <domainName>
const isRightCommand = process.argv[2] === "nest" && (process.argv[3] === "g" || process.argv[3] === "generate") && (process.argv[4] === "domain");
if (!isRightCommand) {
  throw new Error("잘못된 명령어입니다.");
}

const createDirIfNotExist = (absolutePath) => {
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath);
  }
}

const createFileIfNotExist = (absolutePath, data) => {
  if (!fs.existsSync(absolutePath)) {
    createFileIfNotExist(absolutePath, data);
  }
}

const domainName = process.argv[5];
const domainNameCapitalizedFirstChar = domainName.charAt(0).toUpperCase() + domainName.slice(1);

createDirIfNotExist(`src`)
createDirIfNotExist(`src/${domainName}`)
createDirIfNotExist(`src/${domainName}/application`)
createDirIfNotExist(`src/${domainName}/application/requestDto`)
createDirIfNotExist(`src/${domainName}/application/responseDto`)
createDirIfNotExist(`src/${domainName}/domain`)
createDirIfNotExist(`src/${domainName}/presentation`)
createDirIfNotExist(`src/${domainName}/test`)

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
createFileIfNotExist(`src/${domainName}/${domainName}.module.ts`, moduleTemplate)

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
createFileIfNotExist(`src/${domainName}/application/${domainName}.service.ts`, serviceTemplate);
const entityTemplate = `import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "${domainName}s" })
export class ${domainNameCapitalizedFirstChar} {
  @PrimaryGeneratedColumn()
  id: number;
}
`
createFileIfNotExist(`src/${domainName}/domain/${domainName}.entity.ts`, entityTemplate);

const repositoryTemplate = `import { ${domainNameCapitalizedFirstChar}Repository } from "../../common/decorators/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { ${domainNameCapitalizedFirstChar} } from "./${domainName}.entity";

@CustomRepository(${domainNameCapitalizedFirstChar})
export class ${domainNameCapitalizedFirstChar}Repository extends Repository<${domainNameCapitalizedFirstChar}> {
}
`
createFileIfNotExist(`src/${domainName}/domain/${domainName}.repository.ts`, repositoryTemplate);

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
createFileIfNotExist(`src/${domainName}/presentation/${domainName}.controller.ts`, controllerTemplate);


