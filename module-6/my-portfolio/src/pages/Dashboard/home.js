import { useState } from 'react';
import { auth, storage, db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

const Home = () => {
    const [formData, setFormData] = useState({ 
                                                name: "", 
                                                description: "",
                                                url: "",
                                                image: null
                                            })

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;

        setFormData(prev => {
            return {
                ...prev,
                [name]: type === 'file' ? files[0] : value
            }
        })
    }

    const savePortfolio = async (portfolio) => {
        try {
            await addDoc(collection(db, 'portfolio'), portfolio);
            window.location.reload(false); //reload page if it is successfully added to db
        } catch (error) {
            alert('Failed to add portfolio');
        }
    }

    const submitPortfolio = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `portfolio/${formData.image?.name}`);

        uploadBytes(storageRef, formData.image).then(
            (snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadUrl) => {
                    setFormData(prev => {
                        return {
                            ...prev,
                            image: downloadUrl
                        }
                    })

                    savePortfolio(formData)
                }, (error) => {
                    console.log(error);
                    savePortfolio(formData)
                })
            }, (error) => {
                console.log(error);
                savePortfolio(formData)
            }
        )
    }

    return (
        <form onSubmit={submitPortfolio} className="dashboard">
            <input 
                type="text" 
                placeholder="Name"
                name='name'
                value={formData.name} 
                onChange={handleChange}
            />
            <textarea 
                placeholder="Description"
                name='description'
                value={formData.description}
                onChange={handleChange}
            />
            <input 
                type="text" 
                placeholder="Url" 
                name='url'
                value={formData.url}
                onChange={handleChange}
            />
            <input 
                type="file" 
                placeholder="Image" 
                name='image'
                files={formData.image}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
            <button onClick={() => auth.signOut()}>Sign out</button>
        </form>
    )
}

export default Home;