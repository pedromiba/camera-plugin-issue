import {
    Camera,
    GalleryPhotos,
    PermissionStatus,
} from '@capacitor/camera';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Home: React.FC = () => {
    const getNumberOfLimitedLibraryPhotos = async (): Promise<void> => {
        const permissions: PermissionStatus = await Camera.checkPermissions();

        switch (permissions.photos) {
            case 'prompt':
                await Camera.requestPermissions({
                    permissions: ['photos'],
                });

                getNumberOfLimitedLibraryPhotos();
                break;

            case 'limited':
                // This is where it will cause the crash when we select 0 photos for our limited library.
                const limitedLibraryPhotos: GalleryPhotos = await Camera.getLimitedLibraryPhotos();

                alert('There are ' + limitedLibraryPhotos.photos.length + ' photos in your limited library');
                break;

            default:
                alert('You need to set permissions to limited and choose no photos!');
                break;
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Example</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Example</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonButton onClick={() => getNumberOfLimitedLibraryPhotos()}>Get number of limited library photos</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Home;
