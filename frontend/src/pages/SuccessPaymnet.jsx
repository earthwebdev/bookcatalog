import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDataWithoutToken } from '../services/axios.service';
import MainLayout from '../pages/Layout/MainLayout';
import { useDispatch } from 'react-redux';
import {clearCart} from '../reduxtoolkits/cartSlice';

const SuccessPaymnet = () => {
  const [session, setSession] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace('?session_id=', '');
  const dispatch = useDispatch();


  useEffect(() => {
    async function fetchSession() {
        const resp = await getDataWithoutToken('/stripe/checkout-session?sessionId=' + sessionId);
        console.log(resp);
        if(resp.status){
            setSession(resp.session);
           
        }
        dispatch(clearCart());
      /* setSession(
        await fetch('/stripe/checkout-session?sessionId=' + sessionId).then((res) =>
          res.json()
        )
      ); */
    }
    fetchSession();
  }, [sessionId]);

  return (
    <MainLayout>
        <div className=" container mx-auto gap-3 sr-root">
            <div className="sr-main">
                <header className="sr-header">
                <div className="sr-header__logo"></div>
                </header>
                <div className="sr-payment-summary completed-view">
                <h1>Your payment succeeded</h1>
                <h4>View CheckoutSession response:</h4>
                </div>
                <div className="sr-section completed-view">
                <div className="sr-callout">
                    <pre>{session ? JSON.stringify(session): ''}</pre>
                </div>
                <Link to="/">Restart demo</Link>
                </div>
            </div>
            <div className="sr-content">
                <div className="pasha-image-stack">
                <img
                    alt=""
                    src="https://picsum.photos/280/320?random=1"
                    width="140"
                    height="160"
                />
                <img
                    alt=""
                    src="https://picsum.photos/280/320?random=2"
                    width="140"
                    height="160"
                />
                <img
                    alt=""
                    src="https://picsum.photos/280/320?random=3"
                    width="140"
                    height="160"
                />
                <img
                    alt=""
                    src="https://picsum.photos/280/320?random=4"
                    width="140"
                    height="160"
                />
                </div>
            </div>
        </div>
    </MainLayout>
  );
};

export default SuccessPaymnet