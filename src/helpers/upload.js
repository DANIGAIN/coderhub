import path from 'path'
import fs from "node:fs/promises";

export const upload = async (file, dir) => {
    const mintype = ['image/jpg', 'image/jpeg', 'image/png']
    if(!file) return {error:null,image:null};
    try {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const extname = path.extname(file.name)
        const filename =
            file.name
                .replace(extname, '')
                .split(' ')
                .join('-') + Date.now() + extname

        if (!mintype.includes(file.type)) {
            throw new Error('only support .jpg .jpeg .png image ')
        }
        if (file.size > 1e6) {
            throw new Error('only support under 1 mb  file')
        }

        await fs.writeFile(`${process.cwd()}/public/${dir}/${filename}`, buffer)
        return { error: null, image: filename }
    } catch (error) {
        return { error: error.message, image: null }
    }
}    