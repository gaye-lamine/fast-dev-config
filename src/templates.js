import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import { join } from "path";
import { log } from "./utils.js";

const TEMPLATES_DIR = join(process.cwd(), '.fast-dev-config', 'templates');

export const saveTemplate = (name, config) => {
    if (!existsSync(TEMPLATES_DIR)) {
        mkdirSync(TEMPLATES_DIR, { recursive: true });
    }
    
    const templatePath = join(TEMPLATES_DIR, `${name}.json`);
    const templateData = {
        name,
        created: new Date().toISOString(),
        config
    };
    
    writeFileSync(templatePath, JSON.stringify(templateData, null, 2));
    log.success(`Template "${name}" sauvegardé`);
};

export const loadTemplate = (name) => {
    const templatePath = join(TEMPLATES_DIR, `${name}.json`);
    
    if (!existsSync(templatePath)) {
        log.error(`Template "${name}" introuvable`);
        return null;
    }
    
    try {
        const templateData = JSON.parse(readFileSync(templatePath, 'utf8'));
        log.success(`Template "${name}" chargé`);
        return templateData.config;
    } catch (error) {
        log.error(`Erreur lors du chargement du template "${name}"`);
        return null;
    }
};

export const listTemplates = () => {
    if (!existsSync(TEMPLATES_DIR)) {
        log.info('Aucun template sauvegardé');
        return [];
    }
    
    const templates = readdirSync(TEMPLATES_DIR)
        .filter(file => file.endsWith('.json'))
        .map(file => {
            const templatePath = join(TEMPLATES_DIR, file);
            try {
                const data = JSON.parse(readFileSync(templatePath, 'utf8'));
                return {
                    name: data.name,
                    created: data.created
                };
            } catch {
                return null;
            }
        })
        .filter(Boolean);
    
    return templates;
};

export const deleteTemplate = (name) => {
    const templatePath = join(TEMPLATES_DIR, `${name}.json`);
    
    if (!existsSync(templatePath)) {
        log.error(`Template "${name}" introuvable`);
        return false;
    }
    
    unlinkSync(templatePath);
    log.success(`Template "${name}" supprimé`);
    return true;
};