import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import generatePayload from "promptpay-qr";
import { useState } from "react";
import "./i.css";
const qrcode = require("qrcode");

const Tab1: React.FC = () => {
  const options = { type: "svg", color: { dark: "#003b6a", light: "#ffffff" } };
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState("");

  const generateqr = () => {
    const crt: any = document.getElementById("qrcodenew");
    const payload = generatePayload(number, { amount });
    qrcode.toString(payload, options, (err: any, svg: any) => {
      crt.src = "data:image/svg+xml;base64," + window.btoa(svg);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>QR Code Generator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <div className="center">
              <img
                src="https://icons.veryicon.com/png/o/application/wechat/qr-code-76.png"
                id="qrcodenew"
                height="250vw"
              />
            </div>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonSegment onIonChange={e => setAmount(Number(e.detail.value))}>
              <IonSegmentButton value="10">
                <IonLabel>10 บาท</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="20">
                <IonLabel>20 บาท</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="50">
                <IonLabel>50 บาท</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="100">
                <IonLabel>100 บาท</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="500">
                <IonLabel>500 บาท</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="1000">
                <IonLabel>1000 บาท</IonLabel>
              </IonSegmentButton>
            </IonSegment>
            <IonItem>
              <IonInput
                placeholder="กรอกจำนวนเงินที่จะรับ"
                style={{ textAlign: "center" }}
                type="number"
                value={amount}
                onIonChange={(e: any) => setAmount(Number(e.target.value))}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                placeholder="กรอกหมายเลขพร้อมเพย์"
                style={{ textAlign: "center" }}
                onIonChange={(e: any) => setNumber(e.target.value)}
              ></IonInput>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonButton
              expand="block"
              fill="outline"
              onClick={(e) => {
                generateqr();
              }}
            >
              QR Code Generate
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
