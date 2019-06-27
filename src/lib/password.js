
import Crypto from 'crypto'
import { logger } from '@root/core';
import '@babel/polyfill'

const compare = (hash, pass, salt) => {

    return new Promise((resolve, reject) => {

        Crypto.scrypt(pass, salt, 64, (err, deriveKey) => {

            let result = false

            if (err) {
                logger.error(logger);
            } else {
                result = deriveKey.toString('hex') === hash
            }

            resolve(result)
        })
    })
}

/**
 * author: hieunguyen
 * desc: generate salt and hash password
 * @param {*} inputPass 
 * @returns
 *  - hash
 *  - salt
 */
const hash = async inputPass => {

    const salt = await new Promise(resolve => {

        Crypto.randomBytes(32, (err, buf) => {

            if (err) return reject(err);

            resolve(buf.toString('hex'))
        })
    })

    return new Promise((resolve, reject) => {

        Crypto.scrypt(inputPass, salt, 64, (err, deriveKey) => {

            if (err) return reject(err);

            resolve({
                hash: deriveKey.toString('hex'),
                salt
            })
        })
    })
}


export default { compare, hash }