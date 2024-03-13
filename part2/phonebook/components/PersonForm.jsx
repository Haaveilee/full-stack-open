import React from 'react';

const PersonForm = ({
                        newName,
                        newPhone,
                        newNameHandler,
                        newPhoneHandler,
                        addContact,
                    }) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={newNameHandler} />
            </div>
            <div>
                phone: <input value={newPhone} onChange={newPhoneHandler} />
            </div>
            <div>
                <button type="submit" onClick={addContact}>
                    add
                </button>
            </div>
        </form>
    );
};

export default PersonForm;