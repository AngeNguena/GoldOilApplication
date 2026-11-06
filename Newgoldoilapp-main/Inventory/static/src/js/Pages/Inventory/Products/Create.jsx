
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Layout from '../components/Layout';

export default function ProductCreate({
  categories,
  subcategories,
  product_type,
  volume_choices
}) {
  const [activeTab, setActiveTab] = useState(product_type || 'oil');

  const [formData, setFormData] = useState({
    product_type: product_type || 'oil',
    name: '',
    category_id: '',
    subcategory_id: '',
    description: '',
    unit_price: '',
    stock_quantity: 0,
    reference: '',
    brand: '',
    volume: '',
    part_number: '',
    compatible_vehicles: '',
    warranty_period: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredSubcategories = formData.category_id
    ? subcategories.filter(
        sub => sub.category_id === parseInt(formData.category_id)
      )
    : [];

  const handleTabChange = (type) => {
    setActiveTab(type);

    setFormData(prev => ({
      ...prev,
      product_type: type,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category_id'
        ? { subcategory_id: '' }
        : {}),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const submitData = new FormData();

    Object.keys(formData).forEach(key => {
      if (
        formData[key] !== '' &&
        formData[key] !== null &&
        formData[key] !== undefined
      ) {
        submitData.append(key, formData[key]);
      }
    });

    if (imageFile) {
      submitData.append('image', imageFile);
    }

    router.post(
      '/inventory/products/create/',
      submitData,
      {
        forceFormData: true,

        onFinish: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Add New Product
          </h1>

          <p className="text-sm sm:text-base text-gray-600">
            Create a new product in your inventory
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 sm:mb-8 border-b overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">

          <button
            type="button"
            onClick={() => handleTabChange('oil')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'oil'
                ? 'border-red-900 text-red-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Oil & Lubricant
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('spare_part')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'spare_part'
                ? 'border-red-900 text-red-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Spare Part
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8 space-y-6"
        >

          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name <span className="text-red-600">*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
                placeholder="e.g., Castrol EDGE 5W-30"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>

              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
              >
                <option value="">Select Category</option>

                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subcategory
              </label>

              <select
                name="subcategory_id"
                value={formData.subcategory_id}
                onChange={handleChange}
                disabled={!formData.category_id}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 disabled:bg-gray-100"
              >
                <option value="">Select Subcategory</option>

                {filteredSubcategories.map(sub => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reference */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reference
              </label>

              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
                placeholder="Unique product reference"
              />
            </div>

            {/* Unit Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unit Price (FCFA) <span className="text-red-600">*</span>
              </label>

              <input
                type="number"
                name="unit_price"
                value={formData.unit_price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                inputMode="decimal"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
                placeholder="0.00"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity <span className="text-red-600">*</span>
              </label>

              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                required
                min="0"
                inputMode="numeric"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
                placeholder="0"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
                placeholder="Product description..."
              />
            </div>

          </div>

          {/* Oil Specifications */}
          {activeTab === 'oil' && (
            <div className="border-t pt-6">

              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Oil Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>

                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
                    placeholder="e.g., Castrol, Mobil, Shell"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Volume
                  </label>

                  <select
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
                  >
                    <option value="">Select Volume</option>

                    {volume_choices.map(choice => (
                      <option key={choice.value} value={choice.value}>
                        {choice.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            </div>
          )}

          {/* Spare Part Specifications */}
          {activeTab === 'spare_part' && (
            <div className="border-t pt-6">

              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Spare Part Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>

                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
                    placeholder="e.g., Bosch, Mann, Toyota"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Part Number
                  </label>

                  <input
                    type="text"
                    name="part_number"
                    value={formData.part_number}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
                    placeholder="e.g., 04152-YZZA6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Warranty Period
                  </label>

                  <input
                    type="text"
                    name="warranty_period"
                    value={formData.warranty_period}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
                    placeholder="e.g., 6 months, 1 year"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Compatible Vehicles
                  </label>

                  <textarea
                    name="compatible_vehicles"
                    value={formData.compatible_vehicles}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
                    placeholder="e.g., Toyota Camry 2015-2020, Honda Accord 2016-2021"
                  />
                </div>

              </div>
            </div>
          )}

          {/* Image Upload */}
          <div className="border-t pt-6">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image
            </label>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">

              {imagePreview && (
                <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-gray-200 rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex-1 w-full">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-900"
                />

                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Recommended: Square image, at least 500x500px
                </p>

              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t">

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-red-900 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1"
            >
              {loading
                ? 'Creating...'
                : `Create ${activeTab === 'oil' ? 'Oil' : 'Spare Part'}`}
            </button>

            <button
              type="button"
              onClick={() =>
                router.visit(
                  `/inventory/products/?type=${activeTab}`
                )
              }
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors order-2"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </Layout>
  );
}
