import React from "react"

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'

export default function Form({ formLabel, values, labels, currentValue, onChange, windowWidth }) {
    return(
        <div className="card container-small">
            <FormControl>
                <FormLabel>{formLabel}</FormLabel>
                    <RadioGroup value={currentValue} onChange={onChange}>
                        {
                        values.map((value, index) => {
                            // console.log((value == '50') && (windowWidth < 500))
                            return (
                                <FormControlLabel
                                    key={`${value}_${index}`}
                                    value={values[index]}
                                    control={<Radio disabled={((value == '50') && (windowWidth < 600)) ? true : false}/>}
                                    label={labels[index]}
                                />
                            )
                        })
                        }
                    </RadioGroup>
            </FormControl>
        </div>
    )
}