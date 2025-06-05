"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DocumentUploadTabs } from "@/components/DocumentUpload/DocumentUploadTabs"
import { Alert } from "@/components/ui/alert"

interface FormData {
  nome: string
  cnpj: string
  contato: string
  email: string
  telefone: string
}

export default function CadastroTransportadora() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cnpj: "",
    contato: "",
    email: "",
    telefone: "",
  })
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: { file: File; metadata: any }
  }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileAccepted = (file: File, type: string, metadata: any) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: { file, metadata },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validar campos obrigatórios
      const requiredFields = ["nome", "cnpj", "email", "telefone"]
      const missingFields = requiredFields.filter((field) => !formData[field as keyof FormData])
      
      if (missingFields.length > 0) {
        throw new Error("Preencha todos os campos obrigatórios")
      }

      // Criar FormData para envio
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value)
      })

      // Adicionar documentos
      Object.entries(uploadedFiles).forEach(([type, { file, metadata }]) => {
        submitData.append(`documentos[${type}]`, file)
        submitData.append(`metadata[${type}]`, JSON.stringify(metadata))
      })

      // Enviar dados
      const response = await fetch("/api/transportadoras", {
        method: "POST",
        body: submitData,
      })

      if (!response.ok) {
        throw new Error("Erro ao cadastrar transportadora")
      }

      // Redirecionar para dashboard em caso de sucesso
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar cadastro")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header com imagem de fundo */}
      <div className="relative mb-8 p-8 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0074D9] to-[#0066CC] opacity-90" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Cadastro de Transportadora
          </h1>
          <p className="text-white/90">
            Preencha os dados da transportadora e faça upload dos documentos necessários
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr,2fr]">
        {/* Formulário de Dados Básicos */}
        <Card className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome da Transportadora *</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Razão Social"
                />
              </div>

              <div>
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input
                  id="cnpj"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                  placeholder="XX.XXX.XXX/0001-XX"
                />
              </div>

              <div>
                <Label htmlFor="contato">Nome do Contato</Label>
                <Input
                  id="contato"
                  name="contato"
                  value={formData.contato}
                  onChange={handleInputChange}
                  placeholder="Nome do responsável"
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@exemplo.com"
                />
              </div>

              <div>
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(XX) XXXXX-XXXX"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-[#0074D9] hover:bg-[#0066CC]"
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Cadastrar Transportadora"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Upload de Documentos */}
        <div>
          <DocumentUploadTabs
            onFileAccepted={handleFileAccepted}
            onError={(error) => setError(error)}
          />
        </div>
      </div>
    </div>
  )
}
