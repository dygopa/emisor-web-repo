import React from 'react'

export const InputComponent = ({
    hasLabel, 
    label, 
    onChangeProperty, 
    valueProperty, 
    placeholderProperty,
    keyProperty
}) => (
    <div>
        {hasLabel && <p className="font-thin text-sm text-blue-700 mb-3">{label}</p>}
        <input key={keyProperty} placeholder={placeholderProperty} value={valueProperty} onChange={onChangeProperty} type="text" className="focus:border-blue-700 outline-none hover:border-blue-700 transition block relative rounded-md mb-4 border-2 border-blue-400 w-full p-2" />
    </div>
)