import { useSpring} from "@react-spring/three";
import Office from "./Office";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import Avatar from "./Avatar";
import { animate, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Leva } from "leva";

function Experience({ section, menuOpened }) {
    // Define spring animation for position.y
    const { positionY } = useSpring({
        positionY: section === 0 ? 0 : -1,
        config: { mass: 1, tension: 170, friction: 26 },
    });

    const cameraPositionX = useMotionValue();
    const cameraLookAtX = useMotionValue();

    useEffect(()=>{
        animate(cameraPositionX, menuOpened ? -5 : 0);
        animate(cameraLookAtX, menuOpened ? 5 : 0);
    },[menuOpened])

    useFrame((state)=>{
        state.camera.position.x = cameraPositionX.get();
        state.camera.lookAt(cameraLookAtX.get(), 0, 0);
    })

    return (
        <>
            <ambientLight intensity={1} />
            <a.group
                // Bind spring value to position.y
                position={positionY.to(y => [1.5, 0 + y, 3])}
                scale={0.9}
                rotation-y={-Math.PI / 4}
            >
                <Office section={section} />
            </a.group>

            {/* SKILSS  */}
            <group
                position={[1, 0, 3]}
            >
                <directionalLight position={[-5, 3, 5]} intensity={0.4} />
                <Float>
                    <mesh position={[1, -3, -15]} scale={2}>
                        <sphereGeometry />
                        <MeshDistortMaterial
                            opacity={0.8}
                            transparent
                            distort={0.4}
                            speed={2}
                            color={'red'}
                        />
                    </mesh>
                </Float>
                <Float>
                    <mesh scale={3} position={[3, 1, -18]}>
                        <sphereGeometry />
                        <MeshDistortMaterial
                            opacity={0.8}
                            transparent
                            distort={1}
                            speed={5}
                            color={'yellow'}
                        />
                    </mesh>
                </Float>
                <Float>
                    <mesh scale={1.4} position={[-3, -1, -11]}>
                        <boxGeometry />
                        <MeshWobbleMaterial
                            opacity={0.8}
                            transparent
                            factor={1}
                            speed={5}
                            color={'blue'}
                        />
                    </mesh>
                </Float>
                <group scale={2}>
                    <Avatar position-y={section === 0 ? 0 : -0.5} rotation={[-Math.PI / 2, 0, 0]} animation={section === 0 ? 'Typing' : 'Standing'} />
                </group>
            </group>
            <Leva hidden/>
        </>
    );
}

export default Experience;