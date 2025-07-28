import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.tsx';
import { getOrders, deleteOrder } from '../api/get-orders';

interface OrderItem {
    id: number;
    orderId: string;
    customerName: string;
    items: string[];
    createdAt: string;
    updatedAt: string;
}
const Orders = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [message, setMessage] = useState<string>('');
    const { user, signedIn } = useAuth();

    useEffect(() => {
      setMessage('Welcome to the Orders! Here are your current orders:');
      if (signedIn && user) {
        setMessage(`Hello ${user.first_name}, here are your current orders:`);
        getOrders().then(response => {
          if (response.data && response.data.length > 0) {
            setOrderItems(response.data);
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

  const handleDelete = (orderId: string) => {
    deleteOrder(orderId).then(response => {
      console.log(`Order ${orderId} deleted successfully:`, response);
      setOrderItems(prevItems => prevItems.filter(item => item.orderId !== orderId));
    }).catch(error => {
      console.error(`Error deleting order ${orderId}:`, error);
      setMessage(`Failed to delete order ${orderId}. Please try again later.`);
    });
  };

  return (
      <div className="container" style={{ marginTop: '10vh' }}>
          <div className="card-columns">
              {orderItems.length === 0 && !message && <p>Loading orders...</p>}
              {
                  orderItems && orderItems.map((item: OrderItem) => (
                      <div key={item.id} className="card">
                          <div className="card-header">{item.orderId}</div>
                          <div className="card-body">
                              <p className="card-text">{item.items.join(',')}</p>
                              <p className="card-text"><strong>Ordered On {item.createdAt}</strong></p>
                          </div>
                          <div className="card-footer">
                              <a href="#" className="btn btn-danger" onClick={() => handleDelete(item.orderId)}>Delete Order</a>
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