import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserEdit, faTrash, faReply, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {Card, Modal, Button} from 'react-bootstrap';
import {nanoid} from 'nanoid';
import {Formik, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'




function List() {
//STATE
    const [user, setUser] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [indexEdit, setIndexEdit] = useState(null)
    const [indexHapus, setIndexHapus] = useState([])

//GET DATA
    const getUser = async () => {
        try {
            let response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setUser(response.data)
        } catch(e) {
            console.log(e.message)
        }
    }
    useEffect(() => {
        getUser()
    },[])
//CREATE DATA
    const [tambah, setTambah] = useState({
        name:'',
        username:'',
        email:'',
        website:'',
        phone:''
    })
    const tambahSubmit = (values) => {

        const createName = ({
            id: nanoid(),
            name: values.name,
            username: values.username,
            email: values.email,
            website: values.website,
            phone: values.phone
        })
        const saveAs = [...user, createName]
        setUser(saveAs)
        setTambah({
            name:'',
            username:'',
            email:'',
            website:'',
            phone:''
        })
    }
//MODAL CREATE - EDIT DATA
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
//EDIT DATA
    const editData = (id) => {
        const ngeFind = user.find((users) => users.id === id)
        setTambah(ngeFind)
        setIsEdit(true)
        setIndexEdit(id)
        handleShow(true)
    }
    const editSubmit = (values) => {

        const maping = user.map((val) => {
            if(val.id === indexEdit) {
                return{
                    id: val.id,
                    name: values.name,
                    username: values.username,
                    email: values.email,
                    website: values.website,
                    phone: values.phone
                }
            }
            return val
        })
        setUser(maping)
        setIsEdit(false)
        setIndexEdit('')
        setTambah({
            name:'',
            username:'',
            email:'',
            website:'',
            phone:''
        })
    }
//DELETE DATA
    const deleteData = (id) => {
        const hapus = user.filter(users => users.id !== id)
        setUser(hapus)
        setIndexHapus('')
        delClose(true)
    }
//MODAL DELETE
    const [delShow, setDelShow] = useState(false);

    const delClose = () => setDelShow(false);
    const delShows = (id) => {
        setDelShow(true)
        setIndexHapus(id)
    }
//FORMIK
    const initial = {
        name: isEdit ? tambah.name : '',
        username: isEdit ? tambah.username : '',
        email: isEdit ? tambah.email : '',
        website: isEdit ? tambah.website : '',
        phone: isEdit ? tambah.phone : ''
    }
    const submit = (values) => {
        console.log(values)

        if(isEdit) {
            editSubmit(values)
        } else {
            tambahSubmit(values)
        }
    }
//YUP
    const validation = Yup.object({
        name: Yup.string()
            .min(3,'Minimal 3 Karakter')
            .max(30,'Maksimal 30 Karakter')
            .required('name is required'),
        username: Yup.string()
            .min(3,'Minimal 3 Karakter')
            .max(30,'Maksimal 30 Karakter')
            .required('username is required'),
        email: Yup.string()
            .email('email invalid')
            .required('email is required'),
        website: Yup.string()
            .min(3,'Minimal 3 Karakter')
            .max(30,'Maksimal 30 Karakter')
            .required('website is required'),
        phone: Yup.string()
            .min(3,'Minimal 3 Karakter')
            .max(30,'Maksimal 30 Karakter')
            .required('phone is required')
    })



    return(
        <div className='container' style={{marginTop:'150px'}}>
            <Card>

                <div>
                    <Button variant="primary" onClick={handleShow}>
                        Create
                    </Button>
                </div>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}>

                    <Formik 
                        initialValues={initial}
                        validationSchema={validation}
                        onSubmit={submit}>

                        {({touched, errors, isSubmitting, values, handleChange, handleSubmit}) => (

                        <form onSubmit={handleSubmit}>

                            <Modal.Header closeButton>
                                <Modal.Title>{isEdit ? 'Edit Data' : 'Tambah Data'}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <label htmlFor='name'>Nama</label>
                                <Field 
                                    className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                    name='name'
                                    type='text'
                                    autoComplete='off'
                                    required='required'
                                    placeholder='Masukkan Nama...'
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                <p className='text-danger'>
                                    <ErrorMessage className='error' name='name'/>
                                </p>
                                <label htmlFor='username'>Username</label>
                                <Field 
                                    className={`form-control ${touched.username && errors.username ? "is-invalid" : ""}`}
                                    name='username'
                                    type='text'
                                    autoComplete='off'
                                    required='required'
                                    placeholder='Masukkan Username...'
                                    value={values.username}
                                    onChange={handleChange}
                                />
                                <p className='text-danger'>
                                    <ErrorMessage className='error' name='username'/>
                                </p>
                                <label htmlFor='email'>Email</label>
                                <Field 
                                    className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                    name='email'
                                    type='email'
                                    autoComplete='off'
                                    required='required'
                                    placeholder='Masukkan Email...'
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <p className='text-danger'>
                                    <ErrorMessage className='error' name='email'/>
                                </p>
                                <label htmlFor='website'>Website</label>
                                <Field 
                                    className={`form-control ${touched.website && errors.website ? "is-invalid" : ""}`}
                                    name='website'
                                    type='text'
                                    autoComplete='off'
                                    required='required'
                                    placeholder='Masukkan Website...'
                                    value={values.website}
                                    onChange={handleChange}
                                />
                                <p className='text-danger'>
                                    <ErrorMessage className='error' name='website'/>
                                </p>
                                <label htmlFor='phone'>No Handphone</label>
                                <Field 
                                    className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""}`}
                                    name='phone'
                                    type='text'
                                    autoComplete='off'
                                    required='required'
                                    placeholder='Masukkan No Handphone...'
                                    value={values.phone}
                                    onChange={handleChange}
                                />
                                <p className='text-danger'>
                                    <ErrorMessage className='error' name='phone'/>
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    <FontAwesomeIcon icon={faReply}/>
                                </Button>
                                <Button variant="primary" type='submit' disable={isSubmitting} onClick={handleClose}>
                                    <FontAwesomeIcon icon={isEdit ? faUserEdit : faUserPlus}/>
                                </Button>
                            </Modal.Footer>
                        </form>
                        )}
                    </Formik>
                </Modal>

                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Website</th>
                            <th>No Handphone</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((users, index) => {
                                return(
                                    <tr key={users.id}>
                                        <td>{index + 1}</td>
                                        <td>{users.name}</td>
                                        <td>{users.username}</td>
                                        <td>{users.email}</td>
                                        <td>{users.website}</td>
                                        <td>{users.phone}</td>
                                        <td className='text-center'>
                                            <Button className='text-white' variant='warning' onClick={() => {
                                                editData(users.id)
                                                setIsEdit(true)
                                                setTambah(users)}}>
                                                <FontAwesomeIcon icon={faUserEdit}/>
                                            </Button>
                                            <Button style={{marginLeft:'10px'}} onClick={() => delShows(users.id)} variant='danger'>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Card>

            <Modal
                show={delShow}
                onHide={delClose}
                backdrop="static"
                keyboard={false}>

                <Modal.Body closeButton>
                    Yakin Hapus ini?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={delClose}>Tidak</Button>
                    <Button variant="primary" onClick={() => deleteData(indexHapus)}>Yakin</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
export default List;