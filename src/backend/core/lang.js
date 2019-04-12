
import i18n from 'i18n'
import path from 'path'

const bootstrap = () => {

    i18n.configure({
        locales:['en', 'vi'],
        directory: path.resolve(process.cwd(), 'locales'),
        register: global
    });
}