/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Complexity = 'baixo' | 'médio' | 'alto';

export interface LeadData {
  nome: string;
  email: string;
  whatsapp: string;
  empresa?: string;
  tipoServico: string;
  descricao: string;
  complexidade: Complexity;
  prazo: string;
  orcamentoEstimado?: string;
}

export interface QuoteResult {
  valorTotal: number;
  detalhes: string;
  itensIncluidos: string[];
  prazoEstimado: string;
  explicacaoCalculo: string;
  leadScore: 'quente' | 'morno' | 'frio';
  upsellSuggestion?: {
    nome: string;
    descricao: string;
    valorExtra: number;
  };
}

export interface ServicePrice {
  id: string;
  nome: string;
  valorBase: number;
}
