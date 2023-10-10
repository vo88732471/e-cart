import React from "react";
import{ Layout }from "../../components/layouts/Layout";
// import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";
import UserMenu from "../../components/layouts/UserMenu";
const Dashboard = () => {
  const [auth,setAuth] = useAuth();
  return (
    <Layout title={"Dashboard - E-cart"}>
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;