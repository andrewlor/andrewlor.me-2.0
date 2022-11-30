import React, { memo, useState } from 'react'
import { assets } from '../data'
import './Products.sass'

const Products = ({ products }) => (
    <div className="products">
        <img src={assets.lake} />
        {products &&
            products.map(({ title, cost, turnaround, points }, i) => (
                <div className="product" key={i}>
                    <p className="title">{title}</p>
                    <p>{cost}</p>
                    <p>{turnaround}</p>
                    {points.map((point) => (
                        <p>{point}</p>
                    ))}
                    <button className="hoverable">Choose {title}</button>
                </div>
            ))}
        <div className="info">
            <p>
                All projects include 1 free round of revisions after first
                draft. Afterwards the hourly rate is $50 USD/hour.
            </p>
        </div>
    </div>
)

export default memo(Products)
