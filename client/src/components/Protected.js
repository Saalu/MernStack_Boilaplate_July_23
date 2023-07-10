import React from "react";

function Protected() {
  return (
    <div>
      <h2>Protected Routes</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non earum ipsam
        hic! Modi atque magni numquam rem? Quo quasi id, deleniti, sunt
        asperiores sit alias nobis fugit eaque fugiat animi.
      </p>
      {/* <Routes>
        {isLogin ? (
          <Route path="/protected" element={<Protected />} />
        ) : (
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        )}
        {/* <Route path="/" element={<Home />} /> */}
      {/* </Routes> */}
    </div>
  );
}

export default Protected;
