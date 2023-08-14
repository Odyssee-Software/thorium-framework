"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
/**
 * Fonction utilitaire pour créer une instance de TransactionPatern avec des transactions spécifiques de type générique X.
 *
 * @function Transactions
 * @template X - Type générique pour les noms de transactions
 * @returns {TransactionPatern<X>} Une instance de TransactionPatern avec des transactions spécifiques de type X.
 */
const Transactions = () => {
    return new class {
        constructor() {
            this.transactions = new Map();
            this.transactions_onload = new Map();
        }
        /**
         * Ajoute une nouvelle transaction à la fois dans les transactions normales et les transactions à exécuter lors de la génération de l'élément personnalisé.
         *
         * @method set
         * @param {ITransaction} transaction - La transaction à ajouter.
         * @returns {string} L'identifiant unique de la transaction ajoutée.
         */
        set(transaction) {
            let transactionId = crypto.randomUUID();
            this.transactions_onload.set(transactionId, Object.assign({ id: transactionId }, transaction));
            this.transactions.set(transactionId, Object.assign({ id: transactionId }, transaction));
            return transactionId;
        }
        /**
         * Ajoute une nouvelle transaction uniquement dans les transactions normales.
         *
         * @method add
         * @param {ITransaction} transaction - La transaction à ajouter.
         * @returns {string} L'identifiant unique de la transaction ajoutée.
         */
        add(transaction) {
            let transactionId = crypto.randomUUID();
            this.transactions.set(transactionId, Object.assign({ id: transactionId }, transaction));
            return transactionId;
        }
        /**
         * Récupère une transaction à partir de son identifiant.
         *
         * @method get
         * @param {string} transactionId - L'identifiant de la transaction à récupérer.
         */
        get(transactionName) {
        }
    };
};
exports.Transactions = Transactions;
//# sourceMappingURL=index.js.map