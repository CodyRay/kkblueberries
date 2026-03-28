'use client'

import { useActionState, useState } from 'react'
import { saveProducts, type ActionResult } from './actions'
import type { Product } from '@/lib/data'
import { Button } from '@/components/catalyst/button'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { Textarea } from '@/components/catalyst/textarea'
import { ResultMessage, RemoveButton, AddItemButton, FormCard } from './ui'

function PhotoField({
  label,
  namePrefix,
  filename,
  alt,
}: {
  label: string
  namePrefix: string
  filename: string
  alt: string
}) {
  return (
    <div className="space-y-2 rounded-md bg-white p-3 ring-1 ring-black/5">
      <p className="text-xs font-medium text-grey-600">{label}</p>
      <input type="hidden" name={`${namePrefix}.filename`} value={filename} />
      {filename && (
        <div className="relative aspect-square overflow-hidden rounded-md bg-grey-100">
          <img
            src={`/products/${filename}`}
            alt={alt}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <Input
        type="text"
        name={`${namePrefix}.alt`}
        defaultValue={alt}
        placeholder="Alt text"
      />
      <input
        type="file"
        name={`${namePrefix}.file`}
        accept="image/*"
        className="w-full text-sm text-grey-600 file:mr-3 file:rounded file:border-0 file:bg-grey-100 file:px-3 file:py-1 file:text-sm file:font-medium file:text-grey-700 hover:file:bg-grey-200"
      />
    </div>
  )
}

const emptyProduct: Product = {
  name: '',
  description: '',
  price: 0,
  frontImage: '',
  frontImageAlt: '',
  ingredientsImage: '',
  ingredientsImageAlt: '',
}

export default function ProductsForm({ products: initialProducts }: { products: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [result, action, pending] = useActionState<ActionResult | null, FormData>(
    saveProducts,
    null
  )

  return (
    <form action={action}>
      <input type="hidden" name="count" value={products.length} />
      <div className="space-y-3">
        {products.map((product, i) => (
          <FormCard
            key={i}
            header={
              <>
                <Input
                  type="text"
                  name={`products[${i}].name`}
                  defaultValue={product.name}
                  placeholder="Product name"
                  required
                />
                <RemoveButton onClick={() => setProducts(products.filter((_, j) => j !== i))} />
              </>
            }
          >
            <div className="space-y-3">
              <Field>
                <Label>Description</Label>
                <Textarea
                  name={`products[${i}].description`}
                  rows={3}
                  defaultValue={product.description}
                  required
                />
              </Field>
              <Field>
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  name={`products[${i}].price`}
                  defaultValue={product.price}
                  min={0}
                  step={0.01}
                  required
                />
              </Field>
              <Field>
                <Label>Photos</Label>
                <div className="mt-1 grid grid-cols-2 gap-3">
                  <PhotoField
                    label="Front"
                    namePrefix={`products[${i}].frontImage`}
                    filename={product.frontImage}
                    alt={product.frontImageAlt}
                  />
                  <PhotoField
                    label="Ingredients"
                    namePrefix={`products[${i}].ingredientsImage`}
                    filename={product.ingredientsImage}
                    alt={product.ingredientsImageAlt}
                  />
                </div>
              </Field>
            </div>
          </FormCard>
        ))}
      </div>
      <AddItemButton onClick={() => setProducts([...products, emptyProduct])}>
        + Add product
      </AddItemButton>
      <ResultMessage result={result} />
      <div className="mt-6">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Save Products'}
        </Button>
      </div>
    </form>
  )
}
