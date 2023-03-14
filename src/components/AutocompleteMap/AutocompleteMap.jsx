import { useState, useMemo, useEffect } from "react"
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Form, FormGroup, FormControl, ListGroup } from 'react-bootstrap';


const AutocompleteMap = ({ setSelected, selected }) => {

    const [selectedLocation, setSelectedLocation] = useState(null);
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete()
    const handleSelect = async (address) => {
        setValue(address, false)
        clearSuggestions()
        const results = await getGeocode({ address })
        const { lat, lng } = await getLatLng(results[0])
        setSelected([lat, lng])
    }

    return (
        <>
            <FormGroup>
                <FormControl
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    type="text"
                    placeholder="Search an address"
                />
                <ListGroup>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ListGroup.Item
                                key={place_id}
                                action
                                onClick={() => handleSelect(description)}
                            >
                                {description}
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </FormGroup>
        </>
    )
}

export default AutocompleteMap
