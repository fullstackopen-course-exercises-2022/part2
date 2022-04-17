import React from 'react'

export default function SearchBar({ handleSearchChange }) {
  return <input type="search" name="search" placeholder="Search a Name" onChange={handleSearchChange} />
}
