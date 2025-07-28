import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.tsx';
import { getMenu } from '../api/get-menu';

interface MenuItem {
    code: string;
    name: string;
    description: string;
    price: number;
}

const Menu: React.FC = () => {
    const [menuItems] = useState<MenuItem[]>([]);
    const [message, setMessage] = useState<string>('');
    const { user, signedIn } = useAuth();

    useEffect(() => {
      setMessage('Welcome to the Menu! Here are our delicious offerings:');
      if (signedIn && user) {
        setMessage(`Hello ${user.first_name}, here is the menu for you!`);
        getMenu().then(response => {
          console.log('Menu response:', response.data);
          if (response.data && response.data.length > 0) {
            menuItems.push(...response.data);
          } else {
            setMessage('No menu items available at the moment.');
          }
        }).catch(error => {
          console.error('Error fetching menu:', error);
          setMessage('Failed to load menu items. Please try again later.');
        });
      } else if (!user || !signedIn) {
        setMessage('Please sign in to view the menu.');
      }
    }, [signedIn, user]);

    return (
        <div className="container" style={{ marginTop: '10vh' }}>
            <div className="card-columns">
                {menuItems.length === 0 && !message && <p>Loading menu...</p>}
                {
                    menuItems && menuItems.map((item: MenuItem) => (
                        <div key={item.code} className="card">
                            <div className="card-header">{item.name}</div>
                            <div className="card-body">
                                <p className="card-text">{item.description}</p>
                                <p className="card-text"><strong>Price: ${item.price.toFixed(2)}</strong></p>
                            </div>
                            <div className="card-footer">
                                <a href="#" className="btn btn-primary">Order</a>
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

export default Menu;