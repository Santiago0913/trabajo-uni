import React from 'react';
import { OrderConfirmation } from '../types';
import { formatCOP } from '../utils/formatters';
import { OFFICIAL_WHATSAPP_URL } from '../utils/constants';
import { 
  CheckCircle, 
  X, 
  Download, 
  MessageSquare, 
  Printer, 
  Truck, 
  ShieldCheck, 
  Building2, 
  Package, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderConfirmation | null;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  order
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola Pintuko! Acabo de realizar el pedido ${order.orderId} a nombre de ${order.customer.fullName} con cédula ${order.customer.docNumber}. Deseo confirmar el despacho a ${order.shippingAddress.city}, ${order.shippingAddress.addressLine1}.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Voucher */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white p-6 sm:p-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-emerald-100 hover:text-white hover:bg-emerald-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-white/40 shadow-inner">
            <CheckCircle className="w-9 h-9 text-white" />
          </div>

          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xs text-[11px] font-extrabold uppercase tracking-wider rounded-full mb-2">
            ¡Pago Aprobado con Éxito!
          </span>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            ¡Gracias por tu compra, {order.customer.fullName.split(' ')[0]}!
          </h3>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            Hemos confirmado tu pago y tu pedido de pinturas Pintuco® ya está siendo preparado en bodega para despacho.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-950/40 px-4 py-2 rounded-xl text-xs font-mono">
            <span className="text-emerald-300 font-bold">Orden:</span>
            <span className="text-white font-black">{order.orderId}</span>
            <span className="text-emerald-400">•</span>
            <span className="text-emerald-300 font-bold">CUS / Aprobación:</span>
            <span className="text-white font-bold">{order.payment.approvalCode}</span>
          </div>
        </div>

        {/* Voucher Body Details */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Shipping & Delivery Estimate Badge */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                  Fecha Estimada de Entrega
                </span>
                <span className="text-sm font-extrabold text-slate-900 capitalize">
                  {order.estimatedDeliveryDate}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Guía: <strong className="font-mono text-slate-700">{order.trackingNumber}</strong>
                </span>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-blue-200 sm:pl-4">
              <span className="text-[10px] text-slate-500 block">Destino:</span>
              <span className="text-xs font-bold text-slate-800">{order.shippingAddress.city}</span>
              <span className="text-[11px] text-slate-600 block">{order.shippingAddress.addressLine1}</span>
            </div>
          </div>

          {/* Customer & Document Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Datos del Comprador
              </span>
              <p className="font-bold text-slate-900">{order.customer.fullName}</p>
              <p className="text-slate-600">
                <strong>{order.customer.docType}:</strong> {order.customer.docNumber}
              </p>
              <p className="text-slate-600">{order.customer.phone} • {order.customer.email}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Método de Pago
              </span>
              <p className="font-bold text-slate-900">{order.payment.methodLabel}</p>
              <p className="text-slate-600">
                <strong>Entidad:</strong> {order.payment.bankOrFranchise}
              </p>
              <p className="text-slate-600">
                <strong>Estado:</strong> Aprobado y Asentado
              </p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Productos en la Orden ({order.items.length})
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 bg-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-5 h-5 rounded-full border border-slate-300 shrink-0" 
                      style={{ backgroundColor: item.color.hex }} 
                    />
                    <div>
                      <span className="font-bold text-slate-900">{item.product.name}</span>
                      <span className="text-slate-500 block text-[11px]">
                        {item.size} • Color {item.color.name} (Cant: {item.quantity})
                      </span>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    {formatCOP(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-800">{formatCOP(order.payment.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Envío Nacional:</span>
              <span className="font-semibold text-emerald-600">
                {order.payment.shippingCost === 0 ? 'GRATIS' : formatCOP(order.payment.shippingCost)}
              </span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>IVA 19% Discriminado:</span>
              <span>{formatCOP(order.payment.taxIva)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
              <span>Total Pagado:</span>
              <span className="text-lg text-emerald-700">{formatCOP(order.payment.total)}</span>
            </div>
          </div>

        </div>

        {/* Action CTAs */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Imprimir Comprobante</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <a
              href={OFFICIAL_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Notificar a WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1 transition-colors"
            >
              <span>Continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
