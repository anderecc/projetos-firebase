import { db } from '@/lib/connectFirebase';
import { doc, updateDoc } from 'firebase/firestore';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Método não suportado.' });
    }
    const { id } = req.query;
    const values = req.body;

    try {
        await updateDoc(doc(db, 'clientes', id), { ...values })
            .then((response) =>
                res.status(200).json({
                    response,
                    msg: 'Cliente foi alterado com sucesso.',
                })
            )
            .catch((error) =>
                res.status(400).json({
                    error,
                })
            );
    } catch (error) {
        res.status(400).json({
            error: 'Ocorreu algum erro ao tentar alterar o Cliente.',
        });
    }
}
