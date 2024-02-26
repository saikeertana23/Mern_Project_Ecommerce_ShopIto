import React, { useState } from 'react';
import './NewProduct.css';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../services/appApi';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../axios';

function NewProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        createProduct({ name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dedf4hv2z",
                uploadPreset: "eiq5chsz",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }



    return (
        <Container>
            <Row >
                <Col md={6} className='new-product__form--container'>
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className='mt-4' >Create a Product</h1>
                        {isSuccess && <Alert variant="success">Product Created With Success</Alert>}
                        {isError && <Alert variant="danger">{error?.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter Product Description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> Price(₹)</Form.Label>
                            {/* <Form.Label> Price(&#8377;)</Form.Label> */}
                            <Form.Control type="number" placeholder="Price (₹)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className='mb-3' onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Category</Form.Label>
                            {/* <Form.Select>
                <option disabled selected>
                  -- Select One --
                </option>
                <option value="technology">technology</option>
                <option value="tablets">tablets</option>
                <option value="phones">phones</option>
                <option value="laptops">laptops</option>
              </Form.Select> */}
                            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option disabled defaultValue="">
                                    -- Select One --
                                </option>
                                <option value="technology">technology</option>
                                <option value="tablets">tablets</option>
                                <option value="phones">phones</option>
                                <option value="laptops">laptops</option>
                            </Form.Select>

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Upload Images
                            </Button>
                            <div className="images-preview-container">
                                {/* {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div> */}
                                {images.map((image) => (
                                    <div key={image.public_id} className="image-preview">
                                        <img src={image.url} alt={image.public_id} />
                                        {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>

                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess} >Create Product</Button>
                        </Form.Group>


                    </Form>
                </Col>
                <Col md={6} className='new-product__image--container'></Col>
            </Row>
        </Container>
    );
}

export default NewProduct;



