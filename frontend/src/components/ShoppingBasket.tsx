import { useBasket } from '../context/BasketContext';

export const ShoppingBasket = () => {
  const { items, totalPrice, removeFromBasket, clearBasket, isSubmitting, statusMessage, submitPurchase } = useBasket();

  return (
    <aside className="shopping-basket">
      <div className="basket-header">
        <div>
          <h3 className="basket-title">Shopping Basket</h3>
          <p className="basket-count">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="basket-empty">Your basket is empty</div>
      ) : (
        <div className="basket-items">
          {items.map((item) => (
            <div key={item.product.id} className="basket-item">
              <div className="basket-item-left">
                <p className="basket-item-name">{item.product.name}</p>
                <p className="basket-item-quantity">Qty: {item.quantity}</p>
              </div>
              <div className="basket-item-right">
                <p className="basket-item-price">${(item.product.price * item.quantity)}</p>
                <button className="button button-remove" onClick={() => removeFromBasket(item.product.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="basket-summary">
            <div className="basket-total-row">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <div className="basket-actions">
              <button
                className="button button-primary"
                onClick={submitPurchase}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing…' : 'Checkout'}
              </button>
              <button className="button button-secondary" onClick={clearBasket}>
                Clear Basket
              </button>
            </div>
            {statusMessage && (
              <div className="basket-status-message">{statusMessage}</div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
