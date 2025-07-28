import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.tsx';
import { getOrders } from '../api/get-orders';

interface OrderItem {
    id: string;
    name: string;
    description: string;
    price: number;
}
const Orders = () => {
  const [orderItems] = useState<OrderItem[]>([]);
    const [message, setMessage] = useState<string>('');
    const { user, signedIn } = useAuth();

    useEffect(() => {
      setMessage('Welcome to the Orders! Here are your current orders:');
      if (signedIn && user) {
        setMessage(`Hello ${user.first_name}, here are your current orders:`);
        getOrders().then(response => {
          if (response.data && response.data.length > 0) {
            orderItems.push(...response.data);
          } else {
            setMessage('No orders available at the moment.');
          }
        }).catch(error => {
          console.error('Error fetching orders:', error);
          setMessage('Failed to load order items. Please try again later.');
        });
      } else if (!user || !signedIn) {
        setMessage('Please sign in to view the orders.');
      }
    }, [signedIn, user]);

  return (
      <div className="container" style={{ marginTop: '10vh' }}>
          <div className="card-columns">
              {orderItems.length === 0 && !message && <p>Loading orders...</p>}
              {
                  orderItems && orderItems.map((item: OrderItem) => (
                      <div key={item.id} className="card">
                          <div className="card-header">{item.name}</div>
                          <div className="card-body">
                              <p className="card-text">{item.description}</p>
                              <p className="card-text"><strong>Price: ${item.price.toFixed(2)}</strong></p>
                          </div>
                          <div className="card-footer">
                              <a href="#" className="btn btn-danger">Delete Order</a>
                          </div>
                      </div>
                  ))
              }
          </div>
          {message && message.length > 0 && 
            <div className="alert alert-info" style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
              {message}
            </div>
          }
      </div>
  );
};

export default Orders;