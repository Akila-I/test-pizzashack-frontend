import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.tsx';
import { getMenu } from '../api/get-menu';

interface MenuItem {
    name: string;
    description: string;
}

const Menu: React.FC = () => {
    const [menuItems] = useState<MenuItem[]>([]);
    const [message, setMessage] = useState<string>('');
    const { user, signedIn } = useAuth();

    useEffect(() => {
      setMessage('Welcome to the Menu! Here are our delicious offerings:');
      if (signedIn && user) {
        setMessage(`Hello ${user.name}, here is the menu for you!`);
        getMenu().then(response => {
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
        <div className="container">
            {message && <div className="alert alert-info">{message}</div>}
            <div className="card-columns">
                {menuItems.length === 0 && !message && <p>Loading menu...</p>}
                {
                    menuItems && menuItems.map((item: MenuItem) => (
                        <div key={item.name} className="card">
                            <div className="card-header">{item.name}</div>
                            <div className="card-body">
                                <p className="card-text">{item.description}</p>
                                <a href="#" className="btn btn-primary">More...</a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Menu;