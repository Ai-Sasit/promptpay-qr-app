import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding,  IonList,  IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import generatePayload from "promptpay-qr";
import { fetchData, insertData, deleteData } from '../service/action';
import { qrCode } from 'ionicons/icons';
import { useEffect, useReducer, useState } from 'react';

const Tab2: React.FC = () => {
  const options = { type: "svg", color: { dark: "#003b6a", light: "#ffffff" } };
  const [present] = useIonAlert();
  const [data, setData] = useState([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const qrcode = require("qrcode");

  useEffect(() => { fetchData().then((list: any) => setData(list)) }, [])

  const saveQRCode = (item: any) => {
    let lastKey: any = data[data.length-1];
    let newKey = Number(lastKey.key)+1;
    let amount = Number(item.amount);
    const payload = generatePayload(item.number, { amount });
    qrcode.toString(payload, options, (err: any, svg: any) => {
      let image_qr = "data:image/svg+xml;base64," + window.btoa(svg);
      let payload = {
        key: newKey.toString(),
        qrcode: image_qr,
        promptpayid: item.number,
        balance: amount
      }
      insertData(payload).then((data: any) => { setData(data); forceUpdate(); })
    });
  }

  const removeData = (key: string) => {
    deleteData(key).then((data: any) => setData(data));
    forceUpdate();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>QR Code Storage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <IonButton
              expand="block"
              fill="outline"
              onClick={(e) => {
                present({
                  cssClass: 'my-css',
                  header: 'สร้างพร้อมเพย์ QR Code',
                  message: 'กรอกข้อมูลสำหรับบันทึก',
                  inputs: [
                    {
                      name: 'amount',
                      type: 'text',
                      placeholder: 'กรอกจำนวนเงินที่จะรับ'
                    },
                    {
                      name: 'number',
                      type: 'text',
                      placeholder: 'กรอกหมายเลขพร้อมเพย์',
                    }],
                  buttons: [
                    'ยกเลิก',
                    { text: 'บันทึก', handler: (item: any) => { saveQRCode(item) } },
                  ],
                  onDidDismiss: e => console.log('ไม่สน'),
                })
              }}
            >
              Create new Promptpay QR
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonList>
          {data.slice(0).reverse().map((item: any) => <IonItemSliding key={item.key}>
            <IonItem >
              <IonIcon icon={qrCode} />
              <h5>&nbsp;&nbsp;{item.promptpayid}</h5>
              <h5>&nbsp;&nbsp;|&nbsp;{item.amount} บาท</h5>
              <IonButton color="warning" expand="block" fill="clear" onClick={(e) => {
                present({
                  cssClass: 'my-css',
                  header: 'Scan QR Code',
                  message: `<img src="${item.qrcode}" class="card-alert">
                  <h1>Amount: ${item.amount} บาท</h1>
                  <h6>No: ${item.promptpayid}</h6>`,
                  buttons: [{ text: 'ปิด'}],
                  onDidDismiss: e => console.log('ไม่สน'),
                })
              }} slot="end">View</IonButton>
            </IonItem>
            <IonItemOptions side="end">
            <IonItemOption color="danger" onClick={() =>
                        present({
                            cssClass: 'my-css',
                            header: 'แจ้งเตือน!',
                            message: 'คุณต้องการจะลบ QR อันนี้หรือไม่.',
                            buttons: [
                                'ไม่',
                                { text: 'ไช่', handler: (d: any) => {removeData(item.key)} },
                            ],
                            onDidDismiss: (e: any) => console.log('did dismiss'),
                        })
                    }>Delete</IonItemOption>
                    </IonItemOptions>
            </IonItemSliding>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
