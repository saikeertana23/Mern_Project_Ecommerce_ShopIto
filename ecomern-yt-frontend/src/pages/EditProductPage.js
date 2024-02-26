import React, { useEffect, useState } from 'react';
import './NewProduct.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateProductMutation, useUpdateProductMutation } from '../services/appApi';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../axios';

function EditProductPage() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(""); 
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [updateProduct, { isError, error, isLoading, isSuccess }] = useUpdateProductMutation();

    useEffect(() => {
        axios
            .get("/products/" + id)
            .then(({ data }) => {
                const product = data.product;
                setName(product.name);
                setDescription(product.description);
                setCategory(product.category);
                setImages(product.pictures);
                setPrice(product.price);
            })
            .catch((e) => console.log(e));
    }, [id]);

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
        updateProduct({ id, name, description, price, category, images }).then(({ data }) => {
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
                        <h1 className='mt-4' >Edit Product</h1>
                        {isSuccess && <Alert variant="success">Product Updated With Success</Alert>}
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
                            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} >
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
                            <Button type="submit" disabled={isLoading || isSuccess} >Update Product</Button>
                        </Form.Group>


                    </Form>
                </Col>
                <Col md={6} className='new-product__image--container'></Col>
            </Row>
        </Container>
    );
}

export default EditProductPage;



