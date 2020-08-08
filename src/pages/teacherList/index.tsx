import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import './style.css';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/input';
import Select from '../../components/Select';
import api from '../../servises/api';



function TeacherList(){
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        setTeachers(response.data);
    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os Proffys disponives.">
                <form  id="search-teachers" onSubmit={searchTeachers}>
                <Select  
                        name="subject" 
                        label="Matéria" 
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value)}}
                        options={[
                            { value: 'Artes', label:'Artes' },
                            { value: 'Biologia', label:'Biologia' },
                            { value: 'Ciências', label:'Ciências' },
                            { value: 'Educação fisica', label:'Educação fisica' },
                            { value: 'Fisica', label:'Fisica' },
                            { value: 'Geografia', label:'Geografia' },
                            { value: 'Historia', label:'Historia' },
                            { value: 'Matemática', label:'Matemática' },
                            { value: 'Português', label:'Português' },
                            { value: 'Quimica', label:'Quimica' },
                        ]}
                    />
                    <Select  
                        name="week_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => {setWeekDay(e.target.value)}} 
                        options={[
                            { value: '0', label:'Segunda-feira' },
                            { value: '1', label:'Terça-feira' },
                            { value: '2', label:'Quarta-feira' },
                            { value: '3', label:'Quinta-feira' },
                            { value: '4', label:'Sexta-feira' },
                            { value: '5', label:'Sabado' },
                            { value: '6', label:'Domingo' },
                        ]}
                    />
                    <Input 
                        type="time"  
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={(e) => {setTime(e.target.value)}} 
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>               
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />;

                })}
            </main>
        </div>
    )
}

export default TeacherList;