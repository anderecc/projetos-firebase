import { db } from '@/lib/connectFirebase';
import { deleteDoc, doc } from 'firebase/firestore';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Método não suportado.' });
    }
    const { id } = req.query;

    try {
        await deleteDoc(doc(db, 'clientes', id))
            .then((response) =>
                res
                    .status(202)
                    .json({ response, msg: 'Cliente excluído com sucesso.' })
            )
            .catch((error) => res.status(400).json({ error }));
    } catch (error) {
        res.status(400).json({
            error: 'Ocorreu algum erro ao tentar excluir o Cliente.',
        });
    }
}
