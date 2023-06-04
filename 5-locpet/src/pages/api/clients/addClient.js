import { db } from '@/lib/connectFirebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não suportado.' });
    }

    const { nameClient, namePet, phone, address, complement, reference } =
        req.body;

    try {
        let id = Date.now();
        if (!nameClient || !namePet || !phone || !address) {
            return res.status(406).json({
                error: `O campo '${
                    !nameClient
                        ? 'Nome do cliente'
                        : !namePet
                        ? 'Nome do animal'
                        : !phone
                        ? 'Telefone'
                        : !address
                        ? 'Endereço'
                        : ''
                }' deve ser preenchido.`,
            });
        }

        await setDoc(doc(collection(db, 'clientes'), (id = id.toString())), {
            id,
            nameClient,
            namePet,
            phone,
            address,
            complement: complement ? complement : '',
            reference: reference ? reference : '',
        })
            .then((response) =>
                res
                    .status(201)
                    .json({ response, msg: 'Cliente adicionado com sucesso.' })
            )
            .catch((error) => res.status(400).json({ error }));
    } catch (error) {
        res.status(400).json({
            error: 'Ocorreu algum erro ao tentar adicionar o Cliente.',
        });
    }
}
