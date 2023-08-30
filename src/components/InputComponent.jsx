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
        {hasLabel && <p className="font-thin text-sm text-primary mb-3">{label}</p>}
        <input key={keyProperty} placeholder={placeholderProperty} value={valueProperty} onChange={onChangeProperty} type="text" className="focus:border-primary outline-none hover:border-primary transition block relative rounded-md mb-4 border-2 border-primary w-full p-2" />
    </div>
)