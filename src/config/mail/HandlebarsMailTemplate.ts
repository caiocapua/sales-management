import handlebars from 'handlebars';
import fs from 'fs';
import { IParseMailTemplate } from './interfaces/IMailTemplate';

export class HandlebarsMailTEmplate {
    public async parse({
        file,
        variables,
    }: IParseMailTemplate): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf8',
        });
        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}
