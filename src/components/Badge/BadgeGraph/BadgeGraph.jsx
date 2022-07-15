import React from "react";

const BadgeGraph = () => {
  return (
    <div className="badgeGraph">
      <h3>Baromètre de l'estime de soi</h3>
      <div className="contentGraph">
        <div>
          <p className="legendGraph">Lorem ipsum</p>
          <p className="legendGraph">Dolor sit</p>
          <p className="legendGraph">Consectetuer</p>
          <p className="legendGraph">Sed diam</p>
          <p className="legendGraph">Sed diam</p>
        </div>
        <div className="boxGraph">
          <div className="rowGraph">
            <div className="cel" style={{borderTop: 'none'}}></div>
            <div className="cel" style={{borderTop: 'none'}}></div>
            <div className="cel" style={{borderTop: 'none'}}></div>
            <div className="cel" style={{borderTop: 'none'}}></div>
            <div className="cel" style={{borderTop: 'none'}}></div>
            <div className="meterGraph" style={{ width: 80 + "%" }}></div>
          </div>
          <div className="rowGraph">
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="meterGraph" style={{ width: 70 + "%" }}></div>
          </div>
          <div className="rowGraph">
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="meterGraph" style={{ width: 60 + "%" }}></div>
          </div>
          <div className="rowGraph">
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="meterGraph" style={{ width: 50 + "%" }}></div>
          </div>
          <div className="rowGraph">
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="meterGraph" style={{ width: 40 + "%" }}></div>
          </div>
          <div className="rowGraph">
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="cel"></div>
            <div className="meterGraph" style={{ width: 30 + "%" }}></div>
          </div>
          <p className="numberGraph" style={{ right: 187 }}>
            1
          </p>
          <p className="numberGraph" style={{ right: 137 }}>
            2
          </p>
          <p className="numberGraph" style={{ right: 90 }}>
            3
          </p>
          <p className="numberGraph" style={{ right: 43 }}>
            4
          </p>
          <p className="numberGraph">5</p>
          <div className="numberGraph"></div>
        </div>
      </div>
    </div>
  );
};

export default BadgeGraph;
