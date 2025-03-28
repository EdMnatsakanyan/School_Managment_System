import { Modal } from "@mui/material"
import { useEffect, useState } from "react";
import { IClass, IPupil } from "../../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CLASSES } from "../../classes/queries";
import { ADD_PUPIL } from "../queries";
import { useNavigate } from "react-router-dom";

interface IProps {
    isOpen: boolean
    setIsOpen: (b: boolean) => void
    refetch: () => void
}


export default function AddPupilModal({isOpen, setIsOpen, refetch}: IProps){
      const [classes, setClasses] = useState<IClass[] | null>(null);
        const [getClasses] = useLazyQuery(GET_CLASSES);
      const [addPupil, {error}] = useMutation(ADD_PUPIL)

      const navigate = useNavigate()
      const {register, handleSubmit, formState:{errors}} = useForm<Partial<IPupil>>()

      useEffect(() => {
          getClasses()
            .then((res) => setClasses(res.data.classes))
            .catch((err) => console.log(err));
        }, []);


      const handleAdd:SubmitHandler<Partial<IPupil>> = async(data) => {
        try {
            const res = await addPupil({
                variables:{
                    input: {
                        name: data.name,
                        surname: data.surname,
                        class_id: Number(data.class)
                    }
                }
            })
            refetch()
            navigate('/pupils/' + res.data.createPupil.id)
        } catch(err) {
            console.log(err)
        }
      }

    return <>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <form>
                <p>{error?.message}</p>

                {errors.name && <p>{errors.name.message}</p>}
                <input
                    placeholder="name"
                    {...register('name', {
                        required: 'Please fill name',
                        minLength: {
                            value: 3,
                            message: 'Name length can not be less than 3'
                        }
                    })}
                />

                {errors.surname && <p>{errors.surname.message}</p>}
                <input
                    placeholder="surname"
                    {...register('surname', {
                        required: 'Please fill surname',
                        minLength: {
                            value: 3,
                            message: 'Surname length can not be less than 3'
                        }
                    })}
                />

                {errors.class && <p>Please chose class</p>}
                <select
                    {...register('class', {
                        required: 'Please chose a class'
                    })}
                >
                    {
                        classes?.map(c => <option key={c.id} value={c.id}>
                            {c.level}{c.letter}
                            </option>)
                    }
                </select>


                    <button onClick={handleSubmit(handleAdd)}>
                        Add
                    </button>
                <p>Class</p>
            </form>
        </Modal>
    </>
}