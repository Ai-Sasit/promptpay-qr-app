import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonCard>
        {/* eslint-disable-next-line */}
          <img src="https://ionicframework.com/blog/wp-content/uploads/2021/05/capacitor-3-feature-image.png" />
          <IonCardHeader>
            <IonCardTitle>About</IonCardTitle>
            <IonCardSubtitle>Dev Members</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            นายศศิศ วิรัตน์จินดา<br/>
            นายปราชญอนันต์ ศรีสันติแสง<br/>
            นางสาวศศิกานต์ อินวิถี<br/>
            นางสาวธนสร เครือจันทร์
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;