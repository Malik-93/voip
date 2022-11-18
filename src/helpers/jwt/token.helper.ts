import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import JWT, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// console.log('__JWT HELPER__');
// JWT
export const generate_jwt = (data: any, secret: string, expiresIn: string): JwtPayload | string => {
    try {
        return JWT.sign(data, secret, {
            expiresIn,
        });
    } catch (error) {
        throw error;
    }
};
export const verify_jwt = (header_token: string, secret: string,): JwtPayload | string => {
    try {
        console.log('__verify_jwt__');

        const decoded = JWT.verify(header_token, secret);
        return decoded;
    } catch (error) {
        throw error;
    }
};

// CRYPTO
export const generate_api_key = (size: number = 32, format: BufferEncoding = 'base64') => {
    const buffer = randomBytes(size);
    return buffer.toString(format);
}

export const generate_api_secret_hash = (apikey: string): string => {
    const salt = randomBytes(8).toString('hex');
    const buffer = scryptSync(apikey, salt, 64) as Buffer;
    return `${buffer.toString('hex')}.${salt}`;
};

export const compare_hash_keys = (storedKey: string, suppliedKey: string) => {
    const [hashedPassword, salt] = storedKey.split('.');
    const buffer = scryptSync(suppliedKey, salt, 64) as Buffer;
    return timingSafeEqual(Buffer.from(hashedPassword, 'hex'), buffer);
};

export const password_hash = (password: string): string => {
    let _hash = '';
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            _hash = hash;
        });
    })
    return _hash;
};
export const hash_password = async (password: string): Promise<string> => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return `${hash}`
    } catch (error) {
        throw error
    }
};
export const compare_password = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        const isMatched = await bcrypt.compare(password, hashedPassword);
        return isMatched;
    } catch (error) {
        throw error
    }
} 